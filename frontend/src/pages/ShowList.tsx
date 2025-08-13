import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
import { Cards } from '@/components/card'

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
  `
const Wrapper = styled.div`
    bottom: 0;
    left: 0;
    position: relative;
    right: 0;
    top: 10rem;
    // width:100%;
    // z-index:-10;
  `

const CardArea = styled.div`
  bottom: 0;
    left: 0;
    position: relative;
    right: 0;
    top: 50px;
    margin: 0px;
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

interface Show {
  id: number;
  show_name: string;
  area: string;
  // description: string | null;
  // status: number;
  // created_at: string;
  // updated_at: string;
}

export default function ShowList() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  // show 一覧取得
  const getShows = useCallback(() => {
    axios.get(`${API_BASE_URL}/shows`)
      .then(res => {
        const shows = Array.isArray(res.data.data) ? res.data.data : [];
        setShows(shows);
      })
      .catch(console.error);
  }, [API_BASE_URL]);

  useEffect(() => {
    getShows();
  }, [getShows]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const goToSchedule = () => {
    const query = selected.join(",");
    navigate(`/schedule?shows=${query}`);
  };

  return (
    <>
      <HeaderArea>
        <Header title="🌏 ショー　一覧">
          <Link to="/editor">
            編集
          </Link>
        </Header>
      </HeaderArea>

      <Wrapper>
        <h1 className="section-title">📋 ショーを選択</h1>

        {!shows.length && <p>showがありません。</p>}
        <CardArea>
          <ul className="show-list">
            {shows.map(show => (
              <label className="show-card">
                <li className="show-content" key={show.id}>

                  <input
                    type="checkbox"
                    value={show.id}
                    checked={selected.includes(show.id)}
                    onChange={() => toggle(show.id)
                    }
                  />
                  <p className="show-title"> <Cards title={show.show_name} area={show.area}></Cards></p>
                </li>
              </label>
            ))}

          </ul>
        </CardArea>
        <ButtonArea>
          <Button onClick={goToSchedule}>
            スケジュールを組む
          </Button>
        </ButtonArea>
      </Wrapper>


    </>
  );

}
