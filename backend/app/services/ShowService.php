<?php

namespace App\Services;

use App\Models\Show;

class ShowService
{
  /**
   * TODO 一覧取得
   *
   * @return array
   */
  public function getList(): array
  {
    $shows = Show::all();

    return [
      'status' => 'success',
      'data'   => $shows,
    ];
  }

  public function getShowTimes(array $showIds)
  {
    return Show::whereIn('id', $showIds)
      ->with(['getTimes' => function ($query) {
        $query->orderBy('start_time', 'asc'); // 時間の昇順
      }])
      ->get();
  }
}
