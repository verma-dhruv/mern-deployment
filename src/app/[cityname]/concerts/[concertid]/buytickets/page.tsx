"use client"
import React from 'react'
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketsPage.css'
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation'

const BuyTicketsPage  = () => {
    const pathname = usePathname()
    const params = useParams()
    const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
    const { concertid, cityname } = params
    const [concert, setConcert] = React.useState<any>(null)
    const [theatres, setTheatres] = React.useState<any>(null)
    console.log(concertid)

    const getConcert = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/concert/concerts/${concertid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setConcert(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getTheatres = async (date: string) => {
        let concertId = concertid
        let city = cityname

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/concert/screensbyconcertschedule/${city}/${date}/${concertId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setTheatres(data.data)
                }
                else {
                    console.log(data)
                }
            })
    }

    React.useEffect(() => {
        getConcert()
    }, [])

    React.useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])
    return (
        <>
            {
                concert &&
                <div className='buytickets'>
                    <div className='s1'>
                        <div className='head'>
                            <h1>{concert.title} - {concert.language}</h1>
                            <h3>{concert.genre.join(",")}</h3>
                        </div>
                        <DatePicker getSelectedDay={
                            (date: any) => {
                                console.log(date)
                                setSelectedDate(date)
                            }
                        }
                            endDate={100}
                            selectDate={
                                selectedDate
                            }
                            labelFormat={"MMMM"}
                            color={"purple"}
                        />
                    </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='screens'>
                            {
                                theatres.map((screen, index) => {
                                    let screenid = screen._id
                                    return (
                                        <div className='screen' key={index}>
                                            <div>
                                                <h2>{screen.name}</h2>
                                                <h3>{screen.location}</h3>
                                            </div>

                                            <Link href={`${pathname}/${screenid}?date=${selectedDate}`} className='theme_btn1 linkstylenone'>Select</Link>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default BuyTicketsPage 