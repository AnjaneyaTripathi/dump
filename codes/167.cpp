class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i, j, n=numbers.size(), x=0, y=0;
        vector<int> res;
        for(i=0; i<n; i++) {
            for(j=i+1; j<n; j++) {
                if(numbers[i]+numbers[j]==target) {
                    x=i+1;
                    y=j+1;
                    i=n;
                    break;
                } else if(numbers[i]==numbers[j]) {
                    i=j;
                    break;
                } else if(numbers[j]>target) {
                    n=j;
                }
            }
        }
        return {x, y};
    }
};