import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
import { Schedules } from '@/components/schedule'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
  `

const ScheduleArea = styled.div`
 bottom: 0;
    left: 0;
    position: relative;
    right: 0;
    top: 10rem;
    // width:100%;
    // z-index:-10;
`

const TimeLine = styled.div`

`

const ButtonArea = styled.div`
    // bottom: 1000px;
    left: 0;
    position: relative;
    right: 0;
    // top: 100px;
    margin: 0 0 0 auto;
`

const CreateButtonArea = styled.div`
    left: 0;
    position: relative;
    right: 0;
    top: 100px;
    align-items: end;
`

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Schedule {
  id: number;
  show_name: string;
  area: string;
  start_time: number;
  times: Time[];
  // description: string | null;
  // status: number;
  // created_at: string;
  // updated_at: string;
}

interface Time {
  id: number;
  start_time: string;
  end_time: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Schedule() {
  const query = useQuery();
  const showsParam = query.get("shows") || "";
  const [shows, setShows] = useState<Schedule[]>([]);

  const [selectedIds, setSelectedIds] = useState<number[]>(() =>
    showsParam ? showsParam.split(",").map(id => Number(id)) : []
  );

  useEffect(() => {
    if (selectedIds.length > 0) {
      axios.post(`${API_BASE_URL}/shows/schedule`, { ids: selectedIds })
        .then(res => setShows(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedIds]);

  const deleteSchedule = (id: number) => {
    setSelectedIds(prev => prev.filter(n => n !== id));
  }

  const createSchedule = () => {

  }


  return (
    <>
      <HeaderArea>
        <Header title="🌏 ショー　一覧">
          <Link to="/editor">
            共有
          </Link>
        </Header>
      </HeaderArea>
      <Dialog>
        <DialogTrigger>
          <CreateButtonArea className='flex justify-end'>
            <Button className="bg-blue-300 hover:bg-blue-600 text-white px-6 py-2" onClick={() => createSchedule}>スケジュールの追加</Button>
          </CreateButtonArea>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>あいうえお</DialogTitle>
            <DialogDescription>
              あいうえお
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ScheduleArea>
        <h2>スケジュール作成ページ</h2>
        <TimeLine>
          {shows.length > 0 ? (
            <ul className="schedule-list">
              {shows.map(show => (
                <li className="schedule-content" key={show.id}>
                  <Dialog>
                    <DialogTrigger>
                      <p className="schedule-title"> <Schedules title={show.show_name} area={show.area}></Schedules></p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{show.show_name}</DialogTitle>
                        <DialogDescription>
                          🏳{show.area}
                        </DialogDescription>
                        <ButtonArea>
                          {/* アロー関数をonClickの引数にすることで実行時に関数が実行される
                        onClick={関数名(引数)}だと実行結果がonClickに渡されて無限ループになる */}
                          <Button className='bg-red-500 hover:bg-red-600' onClick={() => deleteSchedule(show.id)}>削除</Button>
                        </ButtonArea>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          ) : (
            <p>選択されたショーはありません</p>
          )}
        </TimeLine>
        <div>
          {shows.map((show) => (
            <div key={show.id}>
              <h3>{show.show_name} ({show.area})</h3>
              <ul>
                {show.times.map((time) => (
                  <li key={time.id}>{time.start_time} - {time.end_time}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </ScheduleArea>
    </>
  );

}
