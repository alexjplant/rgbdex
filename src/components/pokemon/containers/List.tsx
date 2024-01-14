import { useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { GetMoves } from '../data/Client';
import { Monster } from '../data/Monster';

export const List = () => {
    const [moves, setMoves] = useState<Monster[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMoves(await GetMoves());
        };

        fetchData();

        return () => {};
    }, []);
    return <Table moves={moves} />
}