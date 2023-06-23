"use client"
import React from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import {BsSnow} from 'react-icons/bs';
import {IoDiamond} from 'react-icons/io5';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Beachfront, ocean views, and more",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "Windmills, lighthouses, and more",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern, contemporary, and more",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Countryside, mountains, and more",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Pools, hot tubs, and more",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Islands, private islands, and more",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Lakefront, lakeside, and more",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Skiing, snowboarding, and more",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "Castles, chateaus, and more",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Camping, glamping, and more",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "Arctic, igloos, and more",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Cave, cave houses, and more",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Desert, desert houses, and more",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Barns, farmhouses, and more",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "Luxury, luxury homes, and more",
  },
];

const Categories = () => {

  const params = useSearchParams();

  const category = params?.get('category');

  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }

  return (
    <Container>
        <div
            className="pt-4 flex flex-row items-center justify-between overflow-x-auto"
        >
          {categories.map((item, index) => (
            <CategoryBox 
              key={index}
              label={item?.label}
              selected={item?.label === category}
              icon={item?.icon}
            />
          ))}
        </div>
    </Container>
  )
}

export default Categories