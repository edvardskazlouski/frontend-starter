<template>
    <div class="users">
        <div>users:</div>
        <div>{{ name }}</div>
        <div>{{ role }}</div>
        <div>{{ token }}</div>
        <button
                @click="refreshUser()"
        >
            Refresh user
        </button>
    </div>
</template>
<script src="./component.js"/>
