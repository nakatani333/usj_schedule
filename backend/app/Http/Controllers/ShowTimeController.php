<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Services\ShowTimeService;

class ShowTimeController extends Controller
{
    protected ShowTimeService $ShowTimeService;

    public function __construct(ShowTimeService $ShowTimeService)
    {
        $this->ShowTimeService = $ShowTimeService;
    }

    public function show(): JsonResponse
    {
        $RegisteredShows = $this->ShowTimeService->allShow();
        return response()->json(
            $RegisteredShows,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    // public function update(Request $request, $showId)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|min:2',
    //         'area' => 'required|string|min:2',
    //         'category' => 'required|string|min:2',
    //         'start_time' => 'required|date_format:H:i',       // 時間リスト
    //     ]);

    //     /** @var \App\Models\ShowTime $show */
    //     $show = $this->ShowTimeService->registerShow($showId);
    //     $show->show->update([
    //         'show_name' => $validated['name'],
    //         'area' => $validated['area'],
    //         'category' => $validated['category'],
    //     ]);

    //     // 時間の更新
    //     // 既存時間なら取得、なければ作成
    //     /** @var \App\Models\Time $time */
    //     $time = \App\Models\Time::firstOrCreate(['start_time' => $validated['start_time']]);
    //     $show->times()->sync([$time->id]);

    //     return response()->json([
    //         'message' => '更新成功',
    //         'show' => $show->load('time'),
    //     ]);
    // }
    public function update(Request $request, $showId)
    {
        // バリデーション
        try {
            $validated = $request->validate([
                'name'       => 'required|string|min:2',
                'area'       => 'required|string|min:2',
                // 'category'   => 'required|string|min:2',
                'start_time' => 'required|date_format:H:i',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }
        // show_times レコード取得

        // $showTime = $this->ShowTimeService->registerShow($showId);
        // if (!$showTime || !$showTime->show) {
        //     return response()->json(['error' => 'ShowTime not found'], 404);
        // }

        // // shows テーブル更新

        // $showTime->show->update([
        //     'show_name'   => $validated['name'],
        //     'area'        => $validated['area'],
        //     'category_id' => $validated['category'],
        // ]);


        try {
            /** @var \App\Models\ShowTime $showTime */
            $showTime = $this->ShowTimeService->registerShow($showId);
            $showTime->show->update([
                'show_name' => $validated['name'],
                'area' => $validated['area'],
                // 'category' => $validated['category'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }


        // show_times テーブル更新
        $showTime->update([
            'start_time' => $validated['start_time'],
            'end_time'   => $validated['end_time'],
        ]);

        return response()->json([
            'status' => 'success',
            'data'   => $showTime->load('show')
        ]);
    }


    public function check(Request $request)
    {
        dd($request);
        return response()->json('success');
    }

    public function registerShow($showId): JsonResponse
    {
        $RegisteredShow = $this->ShowTimeService->registerShow($showId);
        return response()->json(
            $RegisteredShow,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
