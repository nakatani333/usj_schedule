<?php

namespace App\Http\Controllers;

use App\Models\Show;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Services\ShowService;

class ShowController extends Controller
{
    protected ShowService $ShowService;

    public function __construct(ShowService $ShowService)
    {
        $this->ShowService = $ShowService;
    }

    /**
     * show 一覧取得
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $Shows = $this->ShowService->getList();

        return response()->json(
            $Shows,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function getByIds(Request $request)
    {
        $allShows = $this->ShowService->getList();
        $ids = $request->input('ids', []);
        // バリデーション
        $validated = collect($ids)->filter(fn($id) => is_numeric($id))->all();
        $shows = collect($allShows['data'])->whereIn('id', $validated)->values();

        return response()->json(
            $shows,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
