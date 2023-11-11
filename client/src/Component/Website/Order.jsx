import React from 'react'

const Order = () => {
  return (
    <>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n  * {\n  font-family: 'Source Sans Pro'; \n  } \n"
    }}
  />
  <section className="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl bg-white text-gray-600 shadow-lg sm:my-10 sm:border">
    <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
      <div className="bg-slate-50 mx-auto mt-4 mb-10 flex w-full flex-wrap items-center space-x-4 py-4 md:mb-20 md:justify-center md:px-10">
        <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow md:inline-flex">
          1
        </span>
        <span className="hidden text-teal-500 md:inline">Cabin</span>
        <span className="hidden h-0.5 w-10 bg-teal-400 md:inline" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow">
          2
        </span>
        <span className="font-semibold text-blue-600 md:inline">Meals</span>
        <span className="hidden h-0 w-10 border-t-2 border-dashed border-gray-400 md:inline" />
        <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 shadow md:inline-flex">
          3
        </span>
        <span className="hidden text-gray-600 md:inline">Upgrades</span>
        <span className="hidden h-0 w-10 border-t-2 border-dashed border-gray-400 md:inline" />
        <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 shadow md:inline-flex">
          4
        </span>
        <span className="hidden text-gray-600 md:inline">Payment</span>
        <span className="text-xl md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
      <div className="flex w-full flex-col">
        <h1 className="text-2xl font-semibold">Meal Preferences</h1>
        <p className="mt-2 text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
          iure? Nobis rerum autem illum. Et?
        </p>
        <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-4">
          <div className="flex flex-col sm:col-span-3">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Breakfast
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="French Toast">French Toast</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Drink
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="Toast with Strawberry Juice">
                Strawberry Juice
              </option>
            </select>
          </div>
          <div className="flex flex-col sm:col-span-3">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Lunch
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="French Toast">Something light and new</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Drink
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="Toast with Strawberry Juice">Coffee</option>
            </select>
          </div>
          <div className="flex flex-col sm:col-span-3">
            <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
              Dinner
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="French Toast">Eight Course Meal</option>
            </select>
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              className="text-sm font-semibold uppercase text-gray-500"
              htmlFor=""
            >
              Drink
            </label>
            <select
              className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring"
              name=""
              id=""
            >
              <option value="Toast with Strawberry Juice">
                Strawberry Juice
              </option>
            </select>
          </div>
          <label className="mb-4 flex items-center" htmlFor="">
            <input
              className="accent-blue-700 mr-3 h-5 w-5"
              type="checkbox"
              name=""
              id=""
            />
            I'd like dessert, too!
          </label>
        </div>
        <div className="flex flex-col justify-between sm:flex-row">
          <button className="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300">
            Cancel
          </button>
          <button className="group my-2 flex w-full items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring">
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default Order