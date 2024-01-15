import { useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { GetMoves } from '../data/Client';
import { Move } from '../data/Move';

export const List = () => {
    const [moves, setMoves] = useState<Move[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMoves(await GetMoves());
        };

        fetchData();

        return () => {};
    }, []);
    return <Table moves={moves} />
}