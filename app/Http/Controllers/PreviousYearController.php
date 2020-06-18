<?php

namespace App\Http\Controllers;
header("Access-Control-Allow-Origin: *");

use App\Services\PreviousYear;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PreviousYearController extends Controller
{
    public function getPreviousYear(Request $request)
    {
        $input_data = $request->all();
        $input_string = $input_data['input_string'];
        $search_content = new PreviousYear();
        return $search_content->getPreviousYear($request, $input_string);
    }
}
