<script>
    $(document).ready(function() {
        $('.col-hover').hover(
            function(event) {
                $(this).animate({
                    marginTop: "-=1%",
                }, 200);
            }, function(){
                $(this).animate({
                    marginTop: "0%",
                }, 200);
            }
        );
    });
</script>