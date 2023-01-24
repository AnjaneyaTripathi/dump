class Solution {
public:
    string reverseWords(string s) {
        int i;
        string sent, word;
        stringstream ss(s);
        while(ss >> word) {
            int n=word.length();
            for(i=0; i<n; i++) {
                sent.push_back(word[n-i-1]);
            }
            sent=sent+" ";
        }
        string whitespace=" ";
        sent.erase(sent.find_last_not_of(whitespace) + 1);
        return sent;
    }
};