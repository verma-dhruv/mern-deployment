import React from 'react'
import { ConcertCardType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { BsFillStarFill } from 'react-icons/bs';
import './ConcertCard.css'

const ConcertCard = (data: any) => {
    const router = useRouter();
    const { _id, title, genre, rating, portraitImgUrl } = data.Concert;
    const { city } = data.user;
    console.log(city)

    return (
        <div
            className='concertcard'
            onClick={() => {
                router.push(`/${city}/concerts/${_id}`)

            }}
        >
            <div className='concertimg'
                style={{
                    backgroundImage: `url(${portraitImgUrl})`
                }}
            >
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {rating}/10</p>
            </div>
            <div className='details'>
                <p className='title'>
                    {title}
                </p>
                <p className='type'>
                    {genre.join(", ")}
                </p>
            </div>
        </div>
    )
}

export default ConcertCard