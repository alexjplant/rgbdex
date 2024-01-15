import { useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { GetAll } from '../data/Client';
import { TypeMatchup } from '../data/TypeMatchup';

export const List = () => {
    const [typeMatchups, setTypeMatchups] = useState<TypeMatchup[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setTypeMatchups(await GetAll());
        };

        fetchData();

        return () => {};
    }, []);
    return <Table typeMatchups={typeMatchups} />
}