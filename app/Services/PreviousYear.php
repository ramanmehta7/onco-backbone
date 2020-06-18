<?php

namespace App\Services;
header("Access-Control-Allow-Origin: *");

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PreviousYear
{

    public function json_generic($data, $message = "", $status = 200)
    {
        $json = array("message" => $message, "status" => $status, "data" => $data);
        return response()->json($json, 200);
    }


    public function getPreviousYear(Request $request, $input_string)
    {
        $data = $request->all();
        if (isset($data['limit'])) {
            $limit = $data['limit'];
        } else {
            $limit = 4;
        }

        if (isset($data['offset'])) {
            $offset = $data['offset'];
        } else {
            $offset = 0;
        }

        $protocol = stripos($_SERVER['SERVER_PROTOCOL'], 'https') === 0 ? 'https://' : 'http://';
        $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
        $request_uri = $uri_parts[0];

        $data = DB::table('previous_year')
            ->where('subject_name', '=', $input_string)
            ->select(['*'])
            ->limit($limit)
            ->offset($offset)
            ->get();

        $total_entries = DB::table('previous_year')
            ->where('subject_name', '=', $input_string)
            ->count();

        $next_offset = $offset + $limit;
        $prev_offset = $offset - $limit;

        if ($prev_offset < 0) {
            $prev_offset = 0;
        }

        $prev_url = $protocol . $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'] . $request_uri . "?limit=4&offset=" . $prev_offset;
        $next_url = $protocol . $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'] . $request_uri . "?limit=4&offset=" . $next_offset;

        if ($offset <= 0) {
            $prev_url = "";
        }
        if ($next_offset >= $total_entries) {
            $next_url = "";
        }

        $previous_year = array("previous_year" => $data, "next_url" => $next_url, "prev_url" => $prev_url);
        return $this->json_generic($previous_year);
    }
}
