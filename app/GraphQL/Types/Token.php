<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class Token extends GraphQLType
{
    protected $attributes = [
        'name' => 'Token',
        'description' => 'A type for token'
    ];

    public function fields(): array
    {
        return [
            'token'=>['type'=>Type::string()]
        ];
    }
}
