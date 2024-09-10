package com.fixedasset.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
public class RedisUtil {

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * Specify cache expiration time
     *
     * @param key  
     * @param time 
     * @return
     */
    public boolean expire(String key, long time) {
        try {
            if (time > 0) {
                redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Get expiration time based on key
     *
     * @param key  cannot null
     * @return Time (seconds) Returning 0 means it is permanently valid
     */
    public long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }

    /**
     * Determine whether the key exists
     *
     * @param key 
     * @return true Exist false not Exist
     */
    public boolean hasKey(String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Delete cache
     *
     * @param key can pass one value or multiple
     */
    @SuppressWarnings("unchecked")
    public void del(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete(CollectionUtils.arrayToList(key));
            }
        }
    }

    //============================String=============================  

    /**
     * Ordinary cache acquisition
     *
     * @param key
     * @return value
     */
    public Object get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }

    /**
     * Ordinary cache put
     *
     * @param key 
     * @param value
     * @return true success false failure
     */
    public boolean set(String key, Object value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * Normal cache put and set time
     *
     * @param key  
     * @param value
     * @param time  Time (seconds) time must be greater than 0. If time is less than or equal to 0, it will be set indefinitely.
     * @return true success false failure
     */
    public boolean set(String key, Object value, long time) {
        try {
            if (time > 0) {
                redisTemplate.opsForValue().set(key, value, time, TimeUnit.SECONDS);
            } else {
                set(key, value);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Increment
     *
     * @param key
     * @param delta  Increment > 0
     * @return
     */
    public long incr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("The increment factor must be greater than 0");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * reduce
     *
     * @param key
     * @param delta  reduce < 0
     * @return
     */
    public long decr(String key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("Decreasing factor must be greater than 0");
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }

    //================================Map=================================  

    /**
     * HashGet
     *
     * @param key  cannot null
     * @param item cannot null
     * @return value
     */
    public Object hget(String key, String item) {
        return redisTemplate.opsForHash().get(key, item);
    }

    /**
     * Get all key values ​​corresponding to hashKey
     *
     * @param key
     * @return Corresponding multiple key values
     */
    public Map<Object, Object> hmget(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * HashSet
     *
     * @param key 
     * @param map Corresponding multiple key values
     * @return true success false failure
     */
    public boolean hmset(String key, Map<String, Object> map) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * HashSet and set time
     *
     * @param key
     * @param map
     * @param time
     * @return true success false failure
     */
    public boolean hmset(String key, Map<String, Object> map, long time) {
        try {
            redisTemplate.opsForHash().putAll(key, map);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Put data into a hash table. If it does not exist, it will be created.
     *
     * @param key 
     * @param item 
     * @param value
     * @return true success false failure
     */
    public boolean hset(String key, String item, Object value) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Put data into a hash table. If it does not exist, it will be created.
     *
     * @param key 
     * @param item
     * @param value
     * @param time  Time (seconds) Note: If the existing hash table has time, the original time will be replaced here.
     * @return true success false failure
     */
    public boolean hset(String key, String item, Object value, long time) {
        try {
            redisTemplate.opsForHash().put(key, item, value);
            if (time > 0) {
                expire(key, time);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Delete values ​​in hash table
     *
     * @param key   cannot null
     * @param item multi cannot null
     */
    public void hdel(String key, Object... item) {
        redisTemplate.opsForHash().delete(key, item);
    }

    /**
     * Determine whether there is a value for the item in the hash table
     *
     * @param key  cannot null
     * @param item cannot null
     * @return true false
     */
    public boolean hHasKey(String key, String item) {
        return redisTemplate.opsForHash().hasKey(key, item);
    }

    /**
     * hash Increment If it does not exist, it will create one and return the added value.
     *
     * @param key  
     * @param item 
     * @param by   >0 in value
     * @return
     */
    public double hincr(String key, String item, double by) {
        return redisTemplate.opsForHash().increment(key, item, by);
    }

    /**
     * hash Decreasing
     *
     * @param key 
     * @param item
     * @param by   <0 in value
     * @return
     */
    public double hdecr(String key, String item, double by) {
        return redisTemplate.opsForHash().increment(key, item, -by);
    }

    //============================set=============================  

    /**
     * Get all values ​​in Set based on key
     *
     * @param key 
     * @return
     */
    public Set<Object> sGet(String key) {
        try {
            return redisTemplate.opsForSet().members(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Query from a set based on value to see if it exists

     *
     * @param key 
     * @param value
     * @return true or false
     */
    public boolean sHasKey(String key, Object value) {
        try {
            return redisTemplate.opsForSet().isMember(key, value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Put set data into cache
     *
     * @param key
     * @param values
     * @return 
     */
    public long sSet(String key, Object... values) {
        try {
            return redisTemplate.opsForSet().add(key, values);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Put set data into cache
     *
     * @param key
     * @param time
     * @param values
     * @return
     */
    public long sSetAndTime(String key, long time, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().add(key, values);
            if (time > 0) expire(key, time);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Get the length of the set cache
     *
     * @param key
     * @return
     */
    public long sGetSetSize(String key) {
        try {
            return redisTemplate.opsForSet().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Remove the value of value key
     *
     * @param key 
     * @param values
     * @return
     */
    public long setRemove(String key, Object... values) {
        try {
            Long count = redisTemplate.opsForSet().remove(key, values);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    //===============================list=================================  

    /**
     * Get the contents of the list cache
     *
     * @param key 
     * @param start
     * @param end   Ending 0 to -1 represents all values
     * @return
     */
    public List<Object> lGet(String key, long start, long end) {
        try {
            return redisTemplate.opsForList().range(key, start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Get the length of the list cache
     *
     * @param key
     * @return
     */
    public long lGetListSize(String key) {
        try {
            return redisTemplate.opsForList().size(key);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * Get the value in the list by index
     *
     * @param key   
     * @param index When index index>=0, 0 is the head of the table, 1 is the second element, and so on; when index<0, -1 is the tail of the table, -2 is the penultimate element, and so on.
     * @return
     */
    public Object lGetIndex(String key, long index) {
        try {
            return redisTemplate.opsForList().index(key, index);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * put list into cache
     *
     * @param key  
     * @param value
     * @return
     */
    public boolean lSet(String key, Object value) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * put list into cache
     *
     * @param key
     * @param value
     * @param time 
     * @return
     */
    public boolean lSet(String key, Object value, long time) {
        try {
            redisTemplate.opsForList().rightPush(key, value);
            if (time > 0) expire(key, time);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * put list into cache
     *
     * @param key 
     * @param valu
     * @return
     */
    public boolean lSet(String key, List<Object> value) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * put list into cache
     *
     * @param key 
     * @param value
     * @param time
     * @return
     */
    public boolean lSet(String key, List<Object> value, long time) {
        try {
            redisTemplate.opsForList().rightPushAll(key, value);
            if (time > 0) expire(key, time);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Modify a piece of data in the list based on the index
     *
     * @param key   键
     * @param index 索引
     * @param value 值
     * @return
     */
    public boolean lUpdateIndex(String key, long index, Object value) {
        try {
            redisTemplate.opsForList().set(key, index, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Remove N values ​​as value
     *
     * @param key 
     * @param count
     * @param value 
     * @return Remove items
     */
    public long lRemove(String key, long count, Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //================sort set===================
    /**
     * Add elements to ordered set
     *
     * @param key
     * @param value
     * @param score
     * @return
     */
    public boolean zSet(String key, Object value, double score) {
        return redisTemplate.opsForZSet().add(key, value, score);
    }

    public long batchZSet(String key, Set<ZSetOperations.TypedTuple> typles) {
        return redisTemplate.opsForZSet().add(key, typles);
    }

    public void zIncrementScore(String key, Object value, long delta) {
        redisTemplate.opsForZSet().incrementScore(key, value, delta);
    }

    public void zUnionAndStore(String key, Collection otherKeys, String destKey) {
        redisTemplate.opsForZSet().unionAndStore(key, otherKeys, destKey);
    }

    /**
     * Get the number of zsets
     * @param key
     * @param value
     * @return
     */
    public long getZsetScore(String key, Object value) {
        Double score = redisTemplate.opsForZSet().score(key, value);
        if(score==null){
            return 0;
        }else{
            return score.longValue();
        }
    }

    /**
     * Gets the ranking of member member in the sorted set key.
    * The members of the ordered set are sorted by decreasing score value (from large to small).
     * @param key
     * @param start
     * @param end
     * @return
     */
    public Set<ZSetOperations.TypedTuple> getZSetRank(String key, long start, long end) {
        return redisTemplate.opsForZSet().reverseRangeWithScores(key, start, end);
    }

}