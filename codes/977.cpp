class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int l=nums.size()-1, r=nums.size()-1, i, cnt=0;
        if(nums[0]>=0) {
            l=0;
            r=1;
        }
        vector<int> res;
        if(nums.size()==1) {
            res.push_back(nums[0]*nums[0]);
            return res;
        } else {
            for(i=0; i<nums.size()-1; i++) {
                if(nums[i]*nums[i+1]<=0) {
                    l=i;
                    r=i+1;
                    break;
                }
            }
            int lno=nums[l]*nums[l], rno=nums[r]*nums[r];
            if(l==r) rno=INT_MAX;
            while(cnt<nums.size()) {
                if(lno>rno) {
                    res.push_back(rno);
                    if(r<nums.size()-1) {
                        r++;
                        rno=nums[r]*nums[r];
                    }
                    else rno=INT_MAX;
                } else {
                    res.push_back(lno);
                    if(l>0) {
                        l--;
                        lno=nums[l]*nums[l];
                    }
                    else lno=INT_MAX;
                }
                cnt++;
            }
            return res;
        }
    }
};