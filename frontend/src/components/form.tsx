import * as React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  area: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  start_time: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // category: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
})

type FormValues = z.infer<typeof FormSchema>

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// 受け取るパラメータの定義
// タイトルとオペレーション要素を受け取れるようにしている
interface Props {
  // name: string
  // area: string
  // start_time: string
  // category: string
  showId: number
  // timeId: number
  // Reactがjsx内で扱える要素（タグやテキスト、null など）の型
}

// export const InputForm: React.FC<Props> = (props) => {
export function InputForm({ showId }: Props) {
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      area: "",
      start_time: "",
      // category: "",
    },
  })

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast("You submitted the following values", {
  //     description: (
  //       <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   try {
  //     // Laravel API に送信
  //     const res = await axios.post('${API_BASE_URL}/edit', data)

  //     toast("送信成功！", {
  //       description: JSON.stringify(res.data, null, 2),
  //     })
  //   } catch (error) {
  //     toast("送信エラー", {
  //       description: String(error),
  //     })
  //   }
  // }

  React.useEffect(() => {
    async function fetchShow() {
      try {
        const res = await axios.get(`${API_BASE_URL}/shows/${showId}`)
        form.reset(res.data) // APIからの値をフォームにセット
      } catch (error) {
        toast("データ取得エラー", { description: String(error) })
      } finally {
        // setLoading(false)
      }
    }
    fetchShow()
  }, [showId, form])

  async function onSubmit(data: FormValues) {
    console.log("送信データ:", data)
    try {
      const res = await axios.put(`${API_BASE_URL}/shows/${showId}`, data)
      navigate(`/`);
      toast("更新成功！", { description: JSON.stringify(res.data, null, 2) })
    } catch (error) {
      toast("更新エラー", { description: String(error) })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input {...field} />
                {/* <input type="hidden" id='name' value={$name} /> */}
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>エリア</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mario">スーパー・ニンテンドー・ワールド</SelectItem>
                    <SelectItem value="harry">ウィザーディング・ワールド・オブ・ハリー・ポッター
                    </SelectItem>
                    <SelectItem value="minion">ミニオン・パーク</SelectItem>
                    <SelectItem value="Hollywood">ハリウッド・エリア</SelectItem>
                    <SelectItem value="universal">ユニバーサル・ワンダーランド
                    </SelectItem>
                    <SelectItem value="newyork">ニューヨーク・エリア</SelectItem>
                    <SelectItem value="sanfrancisco">サンフランシスコ・エリア</SelectItem>
                    <SelectItem value="jurassic">ジュラシック・パーク</SelectItem>
                    <SelectItem value="amity">アミティ・ビレッジ</SelectItem>
                    <SelectItem value="water">ウォーターワールド</SelectItem>
                    <SelectItem value="map">パークマップ参照</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )
          }
        />
        < FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>開始時間</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* < FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリー</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="エリアを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parade">パレード</SelectItem>
                    <SelectItem value="greeting">グリーティング</SelectItem>
                    <SelectItem value="show-out">ステージショー（屋外）</SelectItem>
                    <SelectItem value="show-in">ステージショー（屋内）</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormDescription>
          {/* フォームの説明 */}
        </FormDescription >
        <FormMessage />
        <Button type="submit"> 変更</Button >
      </form >
    </Form >
  )
}
