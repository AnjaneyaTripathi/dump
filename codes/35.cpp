class Solution {
public:
    int finder(vector<int>& nums, int target, int l, int r) {
        int mid = (l+r)/2;
        if(target==nums[mid]) return mid;
        if(l>=r) {
            if(target<nums[l]) return l;
            return r+1;
        }
        if(target>nums[mid]) {
            return finder(nums, target, mid+1, r);
        }
        return finder(nums, target, l, mid);
    }
    
    int searchInsert(vector<int>& nums, int target) {
        int l=0, r=nums.size()-1, mid;
        mid=(l+r)/2;
        if(target==nums[mid]) return mid;
        else {
            if(target>nums[mid]) {
                return finder(nums, target, mid, r);
            }
            return finder(nums, target, l, mid-1);
        }
    }
};