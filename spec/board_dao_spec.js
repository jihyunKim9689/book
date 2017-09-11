


describe("simple test", function() {
    it("calculate", function() {
        let totalCount = 20;
        let limit = 3;

        let lastPage = Math.ceil(totalCount / limit);
        console.log('lastPage : ' + lastPage);
    });
});