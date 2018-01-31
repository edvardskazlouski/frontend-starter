<template>
    <div class="user">
        <div>user</div>
        <div>{{ id }}</div>
        <button
                @click="openTestModal({ message: 'hello!' })"
        >
            Open test modal
        </button>
    </div>
</template>
<script src="./component.js"/>