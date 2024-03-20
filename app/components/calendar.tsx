import {useEffect, useState} from "react";
import {log} from "node:util";
import useSWR from "swr";
import {MonthType} from "@/types";

export function Calendar() {
    return (
        <div className={'flex flex-col items-center justify-center w-2/3 h-3/5 bg-green-300'}>
            <CalendarHead/>
            <CalendarBody/>
        </div>
    )
}

function CalendarHead() {
    return (
        <div className={'flex text-4xl font-semibold text-slate-800 font-pagella pt-4'}>MARCH</div>
    )
}

const fetcher = async(url: string) => {
    const res = await fetch(url, {method: 'GET'})
    const data = await res.json()
    const {body: monthData} = data
    console.log(monthData)
    return monthData
}

function CalendarBody() {
    const {data: monthData, error: error, isLoading: loading} = useSWR('/api/month', fetcher)
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={'flex flex-wrap w-full h-full'}>
            {monthData.map((month: MonthType)=>(
                <div key={month.date} className={'flex w-1/7 h-1/5'}>
                    <CalendarDate date={month.date} day={month.day}/>
                </div>
            ))}
        </div>
    )
}

interface calendarDateProps {
    date: string,
    day: string
    event?: string,
}

function CalendarDate(props: calendarDateProps) {
    return(
        <div className={'flex-1 bg-white text-slate-800 font-pagella text-start m-0.5 select-none'}>
            <div>{props.date}</div>
            <div>{props.day}</div>
        </div>
    )
}