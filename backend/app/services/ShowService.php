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
}
