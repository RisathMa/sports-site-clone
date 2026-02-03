
import { supabase } from "@/lib/supabase";

export interface House {
    id: string;
    name: string;
    color_key: string;
    total_score: number;
}

export interface Event {
    id: string;
    name: string;
    date: string;
    venue: string;
    status: 'completed' | 'ongoing' | 'upcoming';
}

export interface EventResult {
    id: string;
    event_id: string;
    house_id: string;
    score: number;
    position: 1 | 2 | 3 | 4;
}

export interface HistoricalRanking {
    id: number;
    year: number;
    house_id: string;
    total_score: number;
    rank: number;
}

export interface FullEventData extends Event {
    results: EventResult[];
}

export const sportsService = {
    // Fetch all houses with their total scores
    getHouses: async (): Promise<House[]> => {
        const { data, error } = await supabase
            .from('houses')
            .select('*')
            .order('total_score', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Fetch all events with their results
    getEvents: async (): Promise<FullEventData[]> => {
        const { data: events, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: false });

        if (eventsError) throw eventsError;

        if (!events?.length) return [];

        const { data: results, error: resultsError } = await supabase
            .from('event_results')
            .select('*');

        if (resultsError) throw resultsError;

        // Combine events with their results
        return events.map(event => ({
            ...event,
            results: results?.filter(r => r.event_id === event.id) || []
        }));
    },

    // Get stats for a specific house
    getHouseStats: async (houseId: string) => {
        const { data: results, error } = await supabase
            .from('event_results')
            .select('*, events(*)')
            .eq('house_id', houseId);

        if (error) throw error;

        return results?.map(r => ({
            sport: r.events.name,
            date: r.events.date,
            venue: r.events.venue,
            score: r.score,
            position: r.position as 1 | 2 | 3 | 4,
            // We'll need to fetch all scores for this event to verify context if needed, 
            // but for the modal list this might be enough or we extend it.
            // For now, let's keep it simple and maybe fetch full event context if UI needs "allScores"
        })) || [];
    },

    // Helper to get full structure for HouseDetailsModal
    getHouseDetailsWithAllScores: async (houseId: string) => {
        // This is a bit more complex join, effectively we need:
        // 1. Get all events this house participated in
        // 2. For each of those events, get ALL results (not just this house)

        const { data: myResults, error } = await supabase
            .from('event_results')
            .select('event_id')
            .eq('house_id', houseId);

        if (error) throw error;

        const eventIds = myResults.map(r => r.event_id);

        if (eventIds.length === 0) return [];

        const { data: allRelatedResults, error: allError } = await supabase
            .from('event_results')
            .select('*, events(*)')
            .in('event_id', eventIds);

        if (allError) throw allError;

        // Group by event
        const groupedMap = new Map();

        allRelatedResults?.forEach(r => {
            if (!groupedMap.has(r.event_id)) {
                groupedMap.set(r.event_id, {
                    sport: r.events.name,
                    date: r.events.date,
                    venue: r.events.venue,
                    results: []
                });
            }
            groupedMap.get(r.event_id).results.push({
                house: r.house_id,
                score: r.score,
                position: r.position
            });
        });

        // Transform to match UI structure
        const finalFormat = [];
        for (const [eventId, group] of groupedMap.entries()) {
            const myResult = group.results.find((r: any) => r.house === houseId);
            if (myResult) {
                finalFormat.push({
                    sport: group.sport,
                    date: group.date,
                    venue: group.venue,
                    score: myResult.score,
                    position: myResult.position,
                    allScores: group.results.sort((a: any, b: any) => b.score - a.score)
                });
            }
        }

        return finalFormat;
    },

    // Fetch historical rankings for multiple years
    getHistoricalData: async (): Promise<HistoricalRanking[]> => {
        const { data, error } = await supabase
            .from('historical_rankings')
            .select('*')
            .order('year', { ascending: false })
            .order('rank', { ascending: true });

        if (error) throw error;
        return data || [];
    }
};
