<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Article;
use Closure;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class DeleteArticle extends Mutation
{
    protected $attributes = [
        'name' => 'deleteArticle',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function args(): array
    {
        return [
            'id'=>['type'=>Type::nonNull(Type::int())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $article=Article::find($args['id']);
        if (!$article)
            return new Error("مقاله مورد نظر یافت نشد.");
        return $article->delete();
    }
}
