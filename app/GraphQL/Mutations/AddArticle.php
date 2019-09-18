<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Article;
use Carbon\Carbon;
use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Str;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class AddArticle extends Mutation
{

    protected $attributes = [
        'name' => 'addArticle',
        'description' => 'A mutation for creating an article'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'title'=>['type'=>Type::string()],
            'body'=>['type'=>Type::string()],
            'image'=>['type'=>\GraphQL::type("Upload")],
        ];
    }

    protected function rules(array $args = []): array
    {
        return [
            'title'=>['required','string','max:255'],
            'body'=>['required','string'],
            'image'=>['required','image'],
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $file=$args['image'];
        $fileName=Str::random(25).'.'.$file->getClientOriginalExtension();
        $year=Carbon::now()->year;
        $filePath="/uploads/images/{$year}";
        $fullPath="{$filePath}/{$fileName}";
        $file->move(public_path($filePath),$fileName);
        $article=Article::create([
            'user_id'=>auth()->user()->id,
            'title'=>$args['title'],
            'body'=>$args['body'],
            'image'=>$fullPath,
        ]);
        return $article ? true : false;
    }
}
