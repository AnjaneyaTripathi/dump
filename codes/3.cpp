class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        if(s.length()<2) return s.length();
        int finL=0, finR=0, r=0, l=0, i;
        unordered_map<char, int> umap;
        for(i=0; i<s.length(); i++) {
            if(umap.find(s[i])!=umap.end()) {
                if((r-l)>=(finR-finL)) {
                    finL=l;
                    finR=r;
                }
                if(l<umap[s[i]]+1) {
                    l=umap[s[i]]+1;
                }
            }
            umap[s[i]]=i;
            r=i;
        }
        if((r-l)>=(finR-finL)) {
            finL=l;
            finR=r;
        }
        return finR-finL+1;
    }
};