<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class Article extends GraphQLType
{
    protected $attributes = [
        'name' => 'Article',
        'description' => 'A type for articles'
    ];

    public function fields(): array
    {
        return [
            'id'=>['type'=>Type::int()],
            'title'=>['type'=>Type::string()],
            'body'=>['type'=>Type::string()],
            'image'=>['type'=>Type::string()],
            'user'=>['type'=>\GraphQL::type("User")],
            'created_at'=>['type'=>Type::string()],
            'updated_at'=>['type'=>Type::string()],
        ];
    }
}
