<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Article;
use Carbon\Carbon;
use Closure;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Illuminate\Support\Str;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class EditArticle extends Mutation
{
    protected $attributes = [
        'name' => 'editArticle',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'id'=>['type'=>Type::nonNull(Type::int())],
            'title'=>['type'=>Type::string()],
            'body'=>['type'=>Type::string()],
            'image'=>['type'=>\GraphQL::type("Upload")],
        ];
    }

    protected function rules(array $args = []): array
    {
        $rules=[
            'title'=>['required','string','max:255'],
            'body'=>['required','string'],
        ];
        if ($args['image'])
            $rules['image']=['required','image'];

        return $rules;
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $article=Article::find($args['id']);
        if (!$article)
            return new Error("مقاله مورد نظر یافت نشد.");
        $data=[
            'title'=>$args['title'],
            'body'=>$args['body']
        ];

        if ($args['image']){
            $file=$args['image'];
            $fileName=Str::random(25).'.'.$file->getClientOriginalExtension();
            $year=Carbon::now()->year;
            $filePath="/uploads/images/{$year}";
            $fullPath="{$filePath}/{$fileName}";
            $file->move(public_path($filePath),$fileName);
            $data['image']=$fullPath;
        }

        $result=$article->update($data);
        return $result;
    }
}
