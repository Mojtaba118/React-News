<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class User extends GraphQLType
{
    protected $attributes = [
        'name' => 'User',
        'description' => 'A type for users'
    ];

    public function fields(): array
    {
        return [
            'id'=>['type'=>Type::int()],
            'name'=>['type'=>Type::string()],
            'email'=>['type'=>Type::string()],
            'is_admin'=>['type'=>Type::boolean()],
            'avatar'=>['type'=>Type::string()],
            'articles'=>['type'=>Type::listOf(\GraphQL::type('Article'))],
            'created_at'=>['type'=>Type::string()],
            'updated_at'=>['type'=>Type::string()],
        ];
    }
}
