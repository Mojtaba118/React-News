<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Article;
use Closure;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;

class AllArticles extends Query
{
    protected $attributes = [
        'name' => 'allArticles',
        'description' => 'A query for getting all articles'
    ];

    public function type(): Type
    {
        return Type::listOf(\GraphQL::type("Article"));
    }

    public function args(): array
    {
        return [

        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $articles=Article::all();
        return $articles;
    }
}
