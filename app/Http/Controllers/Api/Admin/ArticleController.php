<?php

namespace App\Http\Controllers\Api\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\File\File;

class ArticleController extends Controller
{
    public function uploadImageContent()
    {
        $file=request()->file("file");
        $fileName=Str::random(30).".".$file->getClientOriginalExtension();
        $year=Carbon::now()->year;
        $filePath="/uploads/images/{$year}";
        $fullPath="{$filePath}/{$fileName}";
        $res=$file->move(public_path($filePath),$fileName);
        if ($res instanceof File)
            return response()->json(['link'=>$fullPath]);
        else
            return response()->json(['error'=>"خطایی در آپلود عکس رخ داد."]);
    }

    public function images()
    {
        $base_url="/uploads/images";
        $images=[];
        $directory=scandir(public_path($base_url));
        for ($i=2;$i<count($directory);$i++){
            $current_url="{$base_url}/{$directory[$i]}";
            if (is_dir(public_path($current_url))){
                $innerDirectory=scandir(public_path($current_url));
                for ($j=2;$j<count($innerDirectory);$j++){
                    $current_url="{$base_url}/{$directory[$i]}/{$innerDirectory[$j]}";
                    $images[]=["url"=>$current_url];
                }
            }else{
                $images[]=["url"=>$current_url];
            }
        }

       return response()->json($images);
    }

    public function deleteImageContent()
    {
        $file=request("src");
        if (file_exists(public_path($file))){
            unlink(public_path($file));
        }
    }
}
