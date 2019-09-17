<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use Closure;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;

class Article extends Query
{
    protected $attributes = [
        'name' => 'article',
        'description' => 'A query'
    ];

    public function type(): Type
    {
        return \GraphQL::type("Article");
    }

    public function args(): array
    {
        return [
            'id'=>['type'=>Type::nonNull(Type::int())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $article=\App\Article::find($args['id']);
        if (!$article)
            return new Error("مقاله مورد نظر یافت نشد.");
        return $article;
    }
}
