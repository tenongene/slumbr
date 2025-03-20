import React, { useState, Link } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import { DatePicker, TimePicker, Stack } from 'rsuite';
import 'rsuite/TimePicker/styles/index.css';
import Input from 'rsuite/Input';
import 'rsuite/Input/styles/index.css';
import 'rsuite/InputGroup/styles/index.css';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';




const labels = {
  1: 'Very Poor+',
  2: 'Very Poor',
  3: 'Poor+',
  4: 'Poor',
  5: 'Ok',
  6: 'Ok+',
  7: 'Good',
  8: 'Good+',
  9: 'Excellent',
  10: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function Logs() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState(-1);


  // const LogObject = {
  //   sleepTime, wakeTime, date, notes
  // }

  const handleChangeSleep = (sleepTime) => {
    setSleepTime(sleepTime);
  };

  const handleChangeWake = (wakeTime) => {
    setWakeTime(wakeTime)
  };

  const handleChangeDate = (date) => {
    setDate(date)
  };

  const handleChangeRate = (date) => {
    setRating(rating)
  };

  const handleChangeNotes = (notes) => {
    setNotes(notes)
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Sleep Log Entry </h1>

            <div className='mt-10'>
            <Stack spacing={17} direction="column" alignItems="flex-start">

              <label>Enter Date:</label>
              <DatePicker value={date} onChange={handleChangeDate}format="MM/dd/yyyy"/>

              <label>Sleep Time:</label>
              <TimePicker value={sleepTime} onChange={handleChangeSleep} format="hh:mm aa" showMeridiem placement='auto'/>

              <label>Wake-Up Time:</label>
              <TimePicker value={wakeTime} onChange={handleChangeWake} format="hh:mm aa" showMeridiem placement='auto'/>  

              <label>Notes</label>
              <Input as="textarea" rows={4} placeholder="Enter sleep notes" value={notes} onChange={handleChangeNotes} />

              <label> How would you rate your sleep?</label>
              <Box sx={{ width: 500, display: 'flex', alignItems: 'center' }}>
                <Rating
                  name="hover-feedback"
                  value={rating}
                  max={10}
                  getLabelText={getLabelText}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {rating !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
              </Box>
            </Stack>   
                 
                <button type="submit" className="mt-10 text-gray-700 dark:text-stone-400 hover:text-violet-700 dark:hover:text-stone-50 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Submit
                </button>
            

            </div>          
              <div className="mt-15">
              <DashboardCard12 notes={notes} date={date} time = {wakeTime - sleepTime}/>
              </div>
          </div>

              {/* Right: Actions */}
          {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-1 mr-15"> 
            
          </div> */}


            </div>
          </div>
         </main>
      </div>
    </div>
    )


}

export default Logs;