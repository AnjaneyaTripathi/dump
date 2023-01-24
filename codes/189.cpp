class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int l=nums.size();
        vector<int> res;
        k=k%l;
        k=(l-k)%l;
        for(int i=0; i<l; i++) {
            cout<<nums[(i+k)%l];
            res.push_back(nums[(i+k)%l]);
        }
        nums=res;
    }
};