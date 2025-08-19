import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/header'
import { InputForm } from '@/components/form'
import { Cards } from '@/components/card'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
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

type Time = {
  id: number;
  start_time: string;
  end_time: string;
};


type ShowTime = {
  id: number;
  show_id: number;
  time_id: number;
  show: Show;
  time: Time;
}

export default function ShowList() {
  // const [shows, setShows] = useState<Show[]>([]);
  const [shows, setShows] = useState<ShowTime[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  // show 一覧取得
  const getShows = useCallback(() => {
    axios.get(`${API_BASE_URL}/shows/edit`)
      .then(res => {
        console.log(res.data);
        const shows = Array.isArray(res.data.data) ? res.data.data : [];
        setShows(shows);
      })
      .catch(console.error);
  }, [API_BASE_URL]);

  useEffect(() => {
    getShows();
  }, [getShows]);

  const items = [
    {
      title: "ホーム",
      url: "/edit",
      icon: Home,
    },
    {
      title: "パレード",
      url: "#",
      icon: Inbox,
    },
    {
      title: "グリーティング",
      url: "#",
      icon: Calendar,
    },
    {
      title: "ステージショー（屋外）",
      url: "#",
      icon: Search,
    },
    {
      title: "ステージショー（屋内）",
      url: "#",
      icon: Settings,
    },
  ]



  return (
    <>
      <HeaderArea>
        <Header title="🌏 ショー　管理">
          <Link to="/edit" hidden>
            編集
          </Link>
        </Header>
      </HeaderArea>

      <Collapsible defaultOpen className="group/collapsible mt-20">
        <SidebarProvider className=''>
          <Sidebar className='mt-20'>
            <SidebarContent>
              <SidebarGroupLabel className='text-2xl'>管理画面</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon color="#3e9392" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter>
              <p className="text-sm text-gray-500">© 2025</p>
            </SidebarFooter>
          </Sidebar>
          <Table className='z-50'>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">名前</TableHead>
                <TableHead>エリア</TableHead>
                <TableHead>開始時間</TableHead>
                <TableHead>カテゴリー</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {shows.map(ShowTime => (
                <TableRow key={ShowTime.id} className=''>
                  <TableCell className="font-medium text-left">{ShowTime.show.show_name}</TableCell>
                  <TableCell className='text-left'>{ShowTime.show.area}</TableCell>
                  <TableCell className='text-left'>{ShowTime.time.start_time}</TableCell>
                  <TableCell className='text-left'>{ShowTime.show.area}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button className='bg-teal-600'>編集</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>

                            <DialogTitle className='text-2xl'>編集</DialogTitle>
                            <DialogDescription>
                              {ShowTime.show.show_name}<br />
                              🏳{ShowTime.show.area}
                            </DialogDescription>

                            {/* 編集フォーム */}
                            {/* <div className="grid w-full max-w-sm items-center gap-3">
                              <Label htmlFor="email">名前</Label>
                              <Input type="text" placeholder={show.show_name} />
                            </div> */}
                            {/* <InputForm name={show.show_name} area={show.area} start_time="a" category={show.area} /> */}

                            <InputForm showId={ShowTime.id} />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Button className='bg-red-500 hover:bg-red-600'>削除</Button>
                    </div>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </SidebarProvider>
      </Collapsible>

    </>
  );

}
