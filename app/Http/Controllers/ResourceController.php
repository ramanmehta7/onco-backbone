<?php

namespace App\Http\Controllers;
header("Access-Control-Allow-Origin: *");

use App\Services\Resources;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ResourceController extends Controller
{
    public function getResources(Request $request)
    {
        $input_data = $request->all();
        $input_string = $input_data['input_string'];

        $search_content = new Resources();
        return $search_content->getResources($request, $input_string);
    }
}
