import { useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { GetAll } from '../data/Client';
import { Move } from '../data/Move';

export const List = () => {
    const [moves, setMoves] = useState<Move[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMoves(await GetAll());
        };

        fetchData();

        return () => {};
    }, []);
    return <Table moves={moves} />
}