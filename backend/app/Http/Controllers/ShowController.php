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
     * Todo 一覧取得
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
}
