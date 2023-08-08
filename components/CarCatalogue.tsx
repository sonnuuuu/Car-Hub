"use client";
import useSWR from "swr";
import { fetchCars } from '@/utils';
import Image from 'next/image'
import SearchBar from './SearchBar'
// import updatese from './SearchBar'
import CustomFilter from './CustomFilter'
import CarCard from './CarCard';
// import { manufacturers } from '@/constants';
import { useSearchParams } from 'next/navigation';
// import { setInterval } from 'timers';
// import {  HomeProps } from "@/types";
import { fuels, yearsOfProduction } from '@/constants';
import ShowMore from './ShowMore';
// import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@components";

// interface FilterProps {
//   // manufacturer: "bmw", 
//   manufacturer?: string, 
//     // year: 2022, 
//     year: number, 
//     fuel: string, 
//     limit: number, 
//     // model: "m8"
//     model: string
// }
// interface HomeProps {
//   searchParams: FilterProps;
// }
// const searchParams: any;

export default function CarCatalogue() {

  const searchParam = useSearchParams()
 
  const manufacturer = searchParam.get('manufacturer') as string;
  const year = Number(searchParam.get('year')) || 2022;
  const fuel = searchParam.get('fuel') as string || "gas";
  const limit = Number(searchParam.get('limit')) || 5;
  const model = searchParam.get('model') as string || "";
  // const {searchParam.get('manufacturer') as string} = Ap;
  
// const CarCatalogue = async ({ searchParams } : HomeProps) => {



  // const allCars =  fetchCars({
  //   manufacturer: manufacturer || "",
  //   year: year || 2022,
  //   fuel: fuel || "",
  //   limit: limit || 5,
  //   model: model || "",
  // });




  const searchKey = JSON.stringify({
    manufacturer,
    year,
    fuel,
    limit,
    model,
  });
  const { data: allCars} = useSWR(['carData',searchKey], () =>
  fetchCars({
    manufacturer: manufacturer || "",
    year: year || 2022,
    fuel: fuel || "",
    limit: limit || 5,
    model: model || "",
  })
);



  // console.log(manufacturer);
  // console.log(year);
  // console.log(fuel);
  // console.log(limit);
  // console.log(model);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  // function name(a : any) {
  //   console.log(a);
  // }
  // name(Array(allCars));
  // name(fetchCars);
  return (
    <div className="mt-12 padding-x padding-y max-width" id='discover'>
      <div className="home__text-container">
        <h1 className="text-4x1 font-extrabold">Car catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      {/* console.log("hi"); */}
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options = {yearsOfProduction } />
        </div>
      </div>
      {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
            </div>
        )}
    </div>
  );
}

// export default CarCatalogue
