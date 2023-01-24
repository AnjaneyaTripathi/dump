# Java

## Garbage Collection

### Introduction

Automatically reclaims memory to avoid memory leaks and similar issues pertaining to memory. One of the key features in the Java language. It is carried out by a separate daemon thread called garbage collector.

[Note: daemon threads are low level threads which provide service to user level threads, user level threads are high priority and terminate once the thread is complete]

Objects are stored in the heap of java memory. 

Before Java, 
- malloc(), calloc(), realloc(), 
- free() and 
- constructors and destructors 

were used. Example: C, C++

### Hypotheses in Garbage Collection:

- most objects will soon become unreachable (eg. variables in a code block will eventually be unreachable once it is out of scope and it can be collected)
- the ones that are left, remain reachable for a very long time

![Hypothesis](https://plumbr.io/app/uploads/2015/05/object-age-based-on-GC-generation-generational-hypothesis.png)

### Steps involved in Garbage Collection

1. Mark: start from the root node and all reachable objects are marked
2. Sweep: unmarked objects are deleted from the heap to reclaim memory
3. Compaction: moving the objects around and making the memory contiguous (rather than it being fragmented) - time consuming

### Generational Collectors

Java GC are called generational collectors. It has spaces based on generations - young generation and old generation space.

Old generation space has objects that have survived for a long time. Minor garbage collections run in the young generation while a major one runs across the whole heap.

![Generations in Heap](https://4.bp.blogspot.com/-D9fWr-aoQf8/Wf6ggShIDQI/AAAAAAAAAbk/XXNdaZIaLisyUbrglEm_2UK4xZV29jmnQCPcBGAYYCw/s1600/Heap%2BGenerations.png)

### Why don't C/C++ have garbage collectors?

"*Garbage collection requires data structures for tracking allocations and/or reference counting. These create overhead in memory, performance, and the complexity of the language. C++ is designed to be "close to the metal", in other words, it takes the higher performance side of the tradeoff vs convenience features. (continued...)*" - [StackExchange](https://softwareengineering.stackexchange.com/questions/113177/why-do-languages-such-as-c-and-c-not-have-garbage-collection-while-java-does)

 ***

## Resources

- Garbage Collection
    - https://www.dynatrace.com/resources/ebooks/javabook/how-garbage-collection-works/
    - https://www.youtube.com/watch?v=UnaNQgzw4zY