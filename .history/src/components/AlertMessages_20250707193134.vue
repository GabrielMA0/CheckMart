<template>

    <div class="container-message-alert">
        <div class="alert" role="alert" :class="alertClasses">
            <strong>{{ alertTitle }}</strong> <br> {{ alertMessage }}
        </div>
    </div>

</template>

<script>

    export default{
        name: 'AlertMessages',
        props: ['titleError', 'errorMessage', 'titleWarning', 'warningMessage', 'titleClear', 'clearMessage'],

        computed: {

            alertClasses() {
                return {
                    'alert-danger': this.errorMessage,
                    'alert-warning': this.warningMessage,
                    'alert-success': this.clearMessage,
                };
            },
            alertTitle() {
                return this.titleWarning || this.titleError || this.titleClear;
            },
            alertMessage() {
                return this.errorMessage || this.warningMessage || this.clearMessage;
            },
        },
    }
    
</script>

<style lang="scss" scoped>
    .container-message-alert{
        position: absolute;
        top: -80px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        text-align: center;

        .alert{
            box-shadow: 5px 8px 21px rgba(0,0,0,0.2);
        }
    }
</style>