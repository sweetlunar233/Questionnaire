<script>
    import store from '@/store';
</script>

<template>
    <div class="all_container">
        <div class="photo">
        </div>
        <div class="username">
            <!-- {{ store.state.nowuser.username }} -->
        </div>
        <div class="email">

        </div>
        <div class="money">

        </div>
    </div>
</template>

<style>
    .all_container {
        border: black solid 1px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .photo {
            width: 200px;
            height: 200px;
            border-radius: 1000px;
            border: white solid 2px;
            background: url("@/assets/photos/星空.jpg");
            background-size: cover;
        }
    }
</style>