import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { addConnection, removeRecommendation, removeRequest } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ConnectionRecommendation } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const initials = (firstName: string, lastName: string) => `${firstName[0]}${lastName[0]}`.toUpperCase();

const ConnectionsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { connections, recommendations, requests } = useAppSelector((state) => state.connection);

  const connect = (item: ConnectionRecommendation) => {
    dispatch(addConnection({
      id: `conn-${Date.now()}`,
      connectedAt: new Date().toISOString(),
      user: item.user,
    }));
    dispatch(removeRecommendation(item.id));
  };

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.title}>My Network</Text>
            <Text style={styles.summaryText}>{connections.length} connections in your professional graph</Text>
          </View>

          {requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {initials(request.sender.firstName, request.sender.lastName)}
                </Text>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.name}>{request.sender.firstName} {request.sender.lastName}</Text>
                <Text style={styles.meta}>{request.sender.headline}</Text>
                <Text style={styles.meta}>{request.sender.location}</Text>
                <View style={styles.actionRow}>
                  <Pressable style={styles.ignoreButton} onPress={() => dispatch(removeRequest(request.id))}>
                    <Text style={styles.ignoreText}>Ignore</Text>
                  </Pressable>
                  <Pressable
                    style={styles.connectButton}
                    onPress={() => {
                      dispatch(addConnection({
                        id: `conn-${Date.now()}`,
                        connectedAt: new Date().toISOString(),
                        user: request.sender,
                      }));
                      dispatch(removeRequest(request.id));
                    }}
                  >
                    <Text style={styles.connectText}>Accept</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.sectionLabel}>People you may know</Text>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.personCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(item.user.firstName, item.user.lastName)}</Text>
          </View>
          <View style={styles.personInfo}>
            <Text style={styles.name}>{item.user.firstName} {item.user.lastName}</Text>
            <Text style={styles.meta}>{item.user.headline}</Text>
            <Text style={styles.meta}>{item.mutualConnections} mutual connections • {item.reason}</Text>
            <Pressable style={styles.connectButton} onPress={() => connect(item)}>
              <Text style={styles.connectText}>Connect</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.SURFACE,
    paddingBottom: SPACING.L,
  },
  summaryCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  summaryText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.S,
  },
  requestCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.M,
    padding: SPACING.M,
  },
  sectionLabel: {
    ...TYPOGRAPHY.SUBTITLE2,
    backgroundColor: COLORS.BACKGROUND,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.S,
    padding: SPACING.M,
  },
  personCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.M,
    padding: SPACING.M,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  personInfo: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  meta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  connectButton: {
    alignSelf: 'flex-start',
    borderColor: COLORS.PRIMARY,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: SPACING.M,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  connectText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  ignoreButton: {
    alignSelf: 'flex-start',
    borderColor: COLORS.TEXT_TERTIARY,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  ignoreText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
});

export default ConnectionsScreen;
