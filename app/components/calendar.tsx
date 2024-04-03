import {useEffect, useState} from "react";
import {log} from "node:util";
import useSWR from "swr";
import {MonthType} from "@/types";

export function Calendar() {
    return (
        <div className={'flex flex-col rounded-2xl shadow-2xl items-center justify-center w-2/3 px-4 h-4/5 bg-green-200'}>
            <CalendarHead/>
            <CalendarBody/>
        </div>
    )
}

function CalendarHead() {
    return (
        <div className={'flex xl:text-5xl lg:text-3xl  font-semibold text-slate-800 font-texgyre-adventor pt-4'}>
            APRIL 2024</div>
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
            <div className='w-1/7 flex-shrink-0'></div>
            {monthData.map((month: MonthType) => (
                <div key={month.date} className={'flex w-1/7 h-1/6'}>
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

type eventInfo = {
    eventName: string,
    eventTime: string
}
function CalendarDate(props: calendarDateProps) {
    return(
        <div className={'flex-1 bg-white text-slate-800 font-pagella text-start m-0.5 select-none'}>
            <div>
            <span className={'lg:text-2xl text-sm font-bonum text-slate-800'}>{props.date}: </span>
            <span className={'lg:text-xl text-xs font-bold font-bonum'}>{props.day}</span>
            </div>
            <CalendarEvent day={props.day}/>
        </div>
    )
}

interface eventProps { day: string }
function CalendarEvent(props: eventProps) {
    const GetEventMap = (day: string): eventInfo[] => {
        const eventMap: {[key: string]: eventInfo[]} = {
            'Sunday': [{eventName: 'Yu-Gi-Oh!', eventTime: '1:00 pm'}],
            'Monday': [],
            'Tuesday': [{eventName: 'Board Game Night', eventTime: '6:00 pm'}],
            'Wednesday': [{eventName: 'MTG: Commander', eventTime: '6:30 pm'}],
            'Thursday': [{eventName: 'Lorcana & Unmatched', eventTime: '7:00 pm'}],
            'Friday': [{eventName: 'FAB: Arsenal', eventTime: '7:15 pm'},
                {eventName: 'MTG: Modern', eventTime: '7:00 pm'}],
            'Saturday': [{eventName: 'MTG: Standard', eventTime: '3:00 pm'},
                {eventName: 'MTG: Commander', eventTime: '4:30 pm'}],
        }
        return eventMap[day]
    }
    const [events, setEvents] = useState<eventInfo[]>([{eventName: '', eventTime: ''}])
    useEffect(() => {
        setEvents(GetEventMap(props.day))
    }, [props.day]);
        return (
            <div className={'font-iosevka font-semibold lg:text-base text-xs'}>
                {events.map((event: eventInfo, index: number   ) => (
                    <div key={index}>
                    <EventText eventProp={event}/>
                    </div>
                ))}
            </div>
        )
}

const EventText: React.FC<{eventProp: eventInfo}> = ({eventProp}) => {
    return <div className={'font-iosevka font-semibold'}>{eventProp.eventName} - {eventProp.eventTime}</div>
}