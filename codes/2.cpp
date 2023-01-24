class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> umap;
        int i;
        vector<int> res;
        for(i=0; i<nums.size(); i++) {
            if(umap.find(target-nums[i])==umap.end()) {
                umap[nums[i]]=i;
            } else {
                res.push_back(umap[target-nums[i]]);
                res.push_back(i);
                return res;
            }
        }
        res.push_back(0);
        res.push_back(0);
        return res;
    }
};