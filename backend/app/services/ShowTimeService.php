<?php

namespace App\Services;

use App\Models\ShowTime;

class ShowTimeService
{
  /**
   * 選択したショーの時間を取得
   *
   * @return array
   */
  public function getTime(): array
  {
    return [
      'status' => 'success',
      'data'   => $this,
    ];
  }

  public function allShow(): array
  {
    $shows = ShowTime::with(['show', 'time'])->get();

    return [
      'status' => 'success',
      'data'   => $shows,
    ];
  }

  public function registerShow($showId)
  {
    $show = ShowTime::with(['show', 'time'])
      ->where('id', $showId)
      ->first();

    return response()->json([
      'status' => 'success',
      'data'   => $show,
    ]);
  }
}
