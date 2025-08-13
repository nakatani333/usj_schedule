import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
import { Schedules } from '@/components/schedule'

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
    margin: 100px;
`

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Schedule {
  id: number;
  show_name: string;
  area: string;
  // time:
  // description: string | null;
  // status: number;
  // created_at: string;
  // updated_at: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Schedule() {
  const query = useQuery();
  const showsParam = query.get("shows") || "";
  const [shows, setShows] = useState<Schedule[]>([]);

  const selectedIds = useMemo(() => showsParam
    ? showsParam.split(",").map((id: string) => Number(id))
    : [], [showsParam]);
  // console.log(`${API_BASE_URL}/shows/schedule`);
  useEffect(() => {
    if (selectedIds.length > 0) {
      axios.post(`${API_BASE_URL}/shows/schedule`, { ids: selectedIds })
        .then(res => setShows(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedIds]);


  return (
    <>
      <HeaderArea>
        <Header title="🌏 ショー　一覧">
          <Link to="/editor">
            編集
          </Link>
        </Header>
      </HeaderArea>

      <ScheduleArea>
        <h2>スケジュール作成ページ</h2>
        <TimeLine>
          {shows.length > 0 ? (
            <ul className="schedule-list">
              {shows.map(show => (
                <li className="schedule-content" key={show.id}>
                  {/* <span><Schedule time={show.time}></Schedule></span> */}
                  <p className="schedule-title"> <Schedules title={show.show_name} area={show.area}></Schedules></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>選択されたショーはありません</p>
          )}</TimeLine>
      </ScheduleArea>
    </>
  );

}
