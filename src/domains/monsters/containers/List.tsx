import { useEffect, useState } from 'preact/hooks';
import { Table } from '../components/Table';
import { GetAll } from '../data/Client';
import { Monster } from '../data/Monster';

export const List = () => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMonsters(await GetAll());
        };

        fetchData();

        return () => {};
    }, []);
    return <Table monsters={monsters} />
}